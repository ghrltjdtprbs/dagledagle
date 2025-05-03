import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '../entity/like.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Injectable()
export class LikeCommandService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async toggle(postId: number, userId: number): Promise<boolean> {
    const post = await this.postRepo.findOneByOrFail({ id: postId });
    const user = await this.userRepo.findOneByOrFail({ id: userId });

    const existing = await this.likeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      post.likeCount--;
      await this.postRepo.save(post);
      return false;
    }

    const like = this.likeRepo.create({ post, user });
    await this.likeRepo.save(like);
    post.likeCount++;
    await this.postRepo.save(post);
    return true;
  }
}
